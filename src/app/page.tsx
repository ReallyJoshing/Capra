import { HomeBackground } from '@/components/home-background';
import { OdleWordmark } from '@/components/odle-wordmark';

export default function Page() {
  return (
    <main className="canvas home-canvas" id="main-content">
      <HomeBackground />
      <h1 className="wordmark">
        <span className="sr-only">Odle</span>
        <OdleWordmark />
      </h1>
    </main>
  );
}
