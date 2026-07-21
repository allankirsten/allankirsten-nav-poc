const css = `
  .cover-image {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 100dvh;
    z-index: 1;
    overflow: hidden;
  }
  .cover-image picture,
  .cover-image img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .cover-image__ph {
    width: 100%; height: 100%;
    background: linear-gradient(180deg, #141414, #0d0d0d);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #333;
  }
  .cover-image__space {
    height: 100dvh;
  }
`;

export function CoverImage({
  src,
  srcMobile,
  alt = "",
}: {
  src?: string;
  /** Art-directed crop for narrow viewports; falls back to `src` when omitted. */
  srcMobile?: string;
  alt?: string;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="cover-image">
        {src ? (
          <picture>
            {srcMobile ? (
              <source media="(max-width: 639px)" srcSet={`${basePath}${srcMobile}`} />
            ) : null}
            <img src={`${basePath}${src}`} alt={alt} />
          </picture>
        ) : (
          <div className="cover-image__ph">Visual</div>
        )}
      </div>
      <div className="cover-image__space" />
    </>
  );
}
