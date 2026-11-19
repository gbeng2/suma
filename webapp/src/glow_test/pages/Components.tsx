import GlowRoot from "../GlowRoot.tsx";
import ActionsSection from "../gallery/ActionsSection.tsx";
import ContainersSection from "../gallery/ContainersSection.tsx";
import DataDisplaySection from "../gallery/DataDisplaySection.tsx";
import "../gallery/Gallery.css";
import IconsSection from "../gallery/IconsSection.tsx";
import InputsSection from "../gallery/InputsSection.tsx";
import NavigationSection from "../gallery/NavigationSection.tsx";

/**
 * Gallery of every shared glow component, in the same sections as the Figma file.
 * Mounted at /glow_test/components. Use it to compare components with Figma.
 */
export default function Components() {
  return (
    <GlowRoot>
      <div className="gallery">
        <h1>Glow components</h1>
        <ActionsSection />
        <ContainersSection />
        <DataDisplaySection />
        <InputsSection />
        <NavigationSection />
        <IconsSection />
      </div>
    </GlowRoot>
  );
}
