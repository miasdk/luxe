import { useAuthContext } from "../context/AuthContext";
export default function ProfilePage() {
    const { user } = useAuthContext();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
                    <p className="mt-2">User ID: {user.uid}</p>
                    <p className="mt-2">Email: {user.email}</p>
                    <p className="mt-2">Display Name: {user.displayName || "Not set"}</p>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
}