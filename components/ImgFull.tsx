const css = `
  .img-full {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 100dvh;
    z-index: 1;
    overflow: hidden;
  }
  .img-full img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .img-full__ph {
    width: 100%; height: 100%;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #333;
  }
  .img-full__space {
    height: 100dvh;
  }
`;

export function ImgFull({ src, alt = "" }: { src?: string; alt?: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="img-full">
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="img-full__ph">Visual</div>
        )}
      </div>
      <div className="img-full__space" />
    </>
  );
}
