import { useEffect, useState } from "react";
import {
    Box, Typography, TextField, Button, Divider
} from "@mui/material";
import {
    getComments,
    postComment,
    postRating,
    getRatingSummary,
    getEventById,
    getEventAttendees
} from "./../../services/eventService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { getUserId } from "../../services/userService";

const EventFeedback = ({ eventId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [ratingSummary, setRatingSummary] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [canRate, setCanRate] = useState(false);
    const [eventData, setEventData] = useState(null);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getComments(eventId);
            setComments(data);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatingSummary = async () => {
        const data = await getRatingSummary(eventId);
        setRatingSummary(data);
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp?._seconds) return "";
        return new Date(timestamp._seconds * 1000).toLocaleString();
    };

    const checkUserEligibility = async (userId, attendees, event) => {
        const isAttendee = attendees.includes(userId);
        const isOrganizer = userId === event.organizerId;
        const isSpeaker = Array.isArray(event.keynoteSpeakers) && event.keynoteSpeakers.includes(userId);

        return isAttendee && !isOrganizer && !isSpeaker;
    };

    const handleCommentSubmit = async () => {
        const userId = await getUserId();
        if (!userId || !newComment.trim()) return;

        setSubmitting(true);
        await postComment(eventId, userId, newComment.trim());
        setNewComment("");
        await fetchComments();
        setSubmitting(false);
    };

    const handleRating = async (value) => {
        const userId = await getUserId();
        if (!userId) return;

        try {
            await postRating(eventId, userId, value);
            setUserRating(value);
            await fetchRatingSummary();
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const load = async () => {
            const userId = await getUserId();
            const [attendees, ratingData, event] = await Promise.all([
                getEventAttendees(eventId),
                getRatingSummary(eventId),
                getEventById(eventId)
            ]);

            setRatingSummary(ratingData);
            setEventData(event);

            const alreadyRated = comments.some(c => c.userId === userId); // OR use a `getUserRating` endpoint later
            const eligible = await checkUserEligibility(userId, attendees, event);
            if (alreadyRated) {
                setUserRating(true);
            }
            setCanRate(eligible && !alreadyRated);

            await fetchComments();
        };

        load();
    }, [eventId]);

    return (
        <Box>
            <Typography variant="h6" mb={2}>Feedback & Comments</Typography>

            {ratingSummary && (
                <Box mb={3}>
                    <Typography variant="body1">
                        ⭐ Average Rating: {ratingSummary.averageRating} ({ratingSummary.totalRatings} ratings)
                    </Typography>
                    {canRate && (
                        <Box mt={1}>
                            {[1, 2, 3, 4, 5].map((val) => (
                                <Button key={val} onClick={() => handleRating(val)}>{val}⭐</Button>
                            ))}
                        </Box>
                    )}
                    {userRating && (
                        <Typography mt={1}>You already rated this event.</Typography>
                    )}
                </Box>
            )}

            <Box
                maxHeight="300px"
                overflow="auto"
                border="1px solid #ccc"
                borderRadius="8px"
                p={2}
                mb={2}
            >
                {loading ? (
                    <LoadingSpinner />
                ) : comments.length ? (
                    comments.map((c) => (
                        <Box key={c.id} mb={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography fontWeight="bold">{c.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {formatTimestamp(c.timestamp)}
                                </Typography>
                            </Box>

                            <Typography variant="body2">{c.comment}</Typography>
                            <Divider sx={{ mt: 1, mb: 1 }} />
                        </Box>
                    ))

                ) : (
                    <Typography>No comments yet.</Typography>
                )}
            </Box>

            <Box display="flex" gap={1}>
                <TextField
                    fullWidth
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    multiline
                    size="small"
                />
                <Button variant="contained" onClick={handleCommentSubmit} disabled={submitting}>
                    {submitting ? "Posting..." : "Post"}
                </Button>
            </Box>
        </Box>
    );
};

export default EventFeedback;
