export const convertBlobArrayToArrayString = async (blobArray) => {
  const promises = blobArray.map((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob); // Читаем Blob как Data URL (Base64)
    });
  });

  try {
    const result = await Promise.all(promises);
    return result; // Возвращаем массив строк (Base64)
  } catch (error) {
    console.error("Ошибка при конвертации Blob в строку:", error);
    return [];
  }
};

export const convertArrayStringToFileArray = async (stringArray) => {
  const promises = stringArray.map((base64String, index) => {
    return fetch(base64String)
      .then((res) => res.blob())
      .then((blob) => {
        const fileName = "EditedFile";
        return new File([blob], fileName, { type: blob.type });
      })
      .catch((error) => {
        console.error("Ошибка при конвертации строки в File:", error);
        return null;
      });
  });

  try {
    const result = await Promise.all(promises);
    return result.filter((file) => file !== null);
  } catch (error) {
    console.error("Ошибка при конвертации строк в File:", error);
    return [];
  }
};
