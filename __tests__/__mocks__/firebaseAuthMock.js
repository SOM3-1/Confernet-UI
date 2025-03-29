export function mockFirebaseAuth(user = { uid: 'test-user' }) {
    vi.mock('firebase/auth', () => ({
      onAuthStateChanged: vi.fn((auth, callback) => {
        callback(user)
        return () => {}
      })
    }))
  }
  