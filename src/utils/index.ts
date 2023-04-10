export const getIdFromUri = (uri: string) => {
  return uri?.split(':').pop();
};
export function millisToMinutesAndSeconds(duration: number) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedMinutes = String(minutes).padStart(1, '0'); // Ensure 2-digit format
  const paddedSeconds = String(remainingSeconds).padStart(2, '0'); // Ensure 2-digit format
  return `${paddedMinutes}:${paddedSeconds}`;
}

export const getSmallestImage = (images: any) => {
  return images.reduce(
    (
      smallest: { height: number; url: string },
      image: { height: number; url: string }
    ) => {
      if (image.height < smallest.height) {
        return image;
      }
      return smallest;
    },
    images[0]
  );
};
