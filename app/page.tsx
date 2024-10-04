import LandingPage from "@/components/landingpage";
import { startPolling } from "@/lib/continousPoll";

export default function Home() {
  startPolling();
  return (
    <div>
      <LandingPage />
    </div>
  );
}
