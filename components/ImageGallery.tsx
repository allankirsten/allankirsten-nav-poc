import { ScrollGallery } from "@/components/ScrollGallery";

export type GalleryImage = { src?: string; alt?: string };

const css = `
  .image-gallery-track {
    gap: 1.5rem;
  }
  .image-gallery-slide {
    width: clamp(240px, 70vw, 420px);
    aspect-ratio: 1 / 1;
    border-radius: 6px;
    overflow: hidden;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-gallery-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .image-gallery-slide-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ccc;
  }
  .image-gallery-dots {
    margin-top: 1.5rem;
  }
`;

/** Image carousel for light-theme pages (about, cases). Same scroll+dots mechanism as the home testimonials. */
export function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <ScrollGallery
        slides={images.map((img, i) =>
          img.src ? (
            <img key={i} src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${img.src}`} alt={img.alt ?? ""} />
          ) : (
            <span key={i} className="image-gallery-slide-label">Photo</span>
          )
        )}
        trackClassName="image-gallery-track"
        slideClassName="image-gallery-slide"
        dotsClassName="image-gallery-dots"
        dotColor="#000"
      />
    </div>
  );
}
