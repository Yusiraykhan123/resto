// app/page.tsx
import { ProfileDisplay } from '../components/ProfileDisplay'; // Hanya impor ProfileDisplay

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <ProfileDisplay /> {/* Hanya menampilkan Profile */}
      </div>
    </div>
  );
}
