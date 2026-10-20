import { HomeBackground } from '@/components/home-background';
import { CapraLogo } from '@/components/capra-logo';

export default function Page() {
  return (
    <main className="canvas home-canvas" id="main-content">
      <HomeBackground />
      <h1 className="wordmark">
        <span className="sr-only">Capra</span>
        <CapraLogo />
      </h1>
    </main>
  );
}
