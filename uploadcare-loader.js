export default function uploadcareLoader({ src, width, quality }) {
  const q = quality || 80;
  return `${src}-/scale_crop/${width}x${width}/smart/-/quality/smart/-/format/auto/`;
}
