import { AES, enc } from 'crypto-js';

const BITS_PER_CHAR = 8;
const MESSAGE_BORDER = '|';
const MESSAGE_HEADER = 'STEGO:';
const MESSAGE_FORMAT =
  MESSAGE_HEADER + '<L>' + MESSAGE_BORDER + '<M>' + MESSAGE_BORDER;

function getImageDataFromBase64Image(base64Image) {
  return new Promise((resolve) => {
    const imageEl = new Image();
    imageEl.onload = () => {
      const canvasEl = document.createElement('canvas');
      canvasEl.width = imageEl.width;
      canvasEl.height = imageEl.height;
      const context = canvasEl.getContext('2d');

      if (context) {
        context.drawImage(imageEl, 0, 0, canvasEl.width, canvasEl.height);
        const imageData = context.getImageData(
          0,
          0,
          canvasEl.width,
          canvasEl.height
        );
        resolve(imageData);
      } else {
        resolve(null);
      }
    };
    imageEl.src = base64Image;
  });
}

function getBase64ImageFromImageData(imageData) {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = imageData.width;
  canvasEl.height = imageData.height;
  const context = canvasEl.getContext('2d');

  if (context) {
    context.putImageData(imageData, 0, 0);
    return canvasEl.toDataURL('image/png', '0.95');
  }

  return '';
}

function getFormattedMessage(message) {
  const length = message.length.toString();
  return MESSAGE_FORMAT.replace('<L>', length).replace('<M>', message);
}

// Encryption method - hides encrypted message in image
export const encodeMessageInImage = async (base64Image, message, password) => {
  try {
    // Get image data from base64 image
    const imageData = await getImageDataFromBase64Image(base64Image);
    if (!imageData) {
      throw new Error('Cannot generate image data from base64 image');
    }

    // Encrypt the message with AES
    const ciphertext = AES.encrypt(message, password).toString();

    // Format the message with header and length information
    const formattedMessage = getFormattedMessage(ciphertext);

    // Convert message to binary
    let binaryMessage = '';
    for (let i = 0; i < formattedMessage.length; i++) {
      binaryMessage += formattedMessage[i]
        .charCodeAt(0)
        .toString(2)
        .padStart(BITS_PER_CHAR, '0');
    }

    if (binaryMessage.length > 3 * imageData.height * imageData.width) {
      throw new Error('Message length is too large to hide in image');
    }

    // Embed the binary message in the least significant bits of image data
    for (let i = 0, j = 0; i < imageData.data.length; i++) {
      if (i % 4 === 3) {
        // Skip alpha channel
        imageData.data[i] = 255; // Keep alpha fully opaque
        continue;
      }

      if (j < binaryMessage.length) {
        // Set LSB to the bit from our message
        imageData.data[i] =
          (imageData.data[i] & 254) + Number(binaryMessage[j]);
        j++;
      }
    }

    // Convert modified image data back to base64
    const result = getBase64ImageFromImageData(imageData);
    if (!result) {
      throw new Error('Cannot generate base64 image from image data');
    }

    return result;
  } catch (error) {
    console.error('Encoding error:', error);
    throw error;
  }
};

// Decryption method - extracts and decrypts message from image
export const decodeMessageFromImage = async (base64Image, password) => {
  try {
    // Get image data from base64 image
    const imageData = await getImageDataFromBase64Image(base64Image);
    if (!imageData) {
      throw new Error('Cannot generate image data from base64 image');
    }

    // Extract binary data from image
    let extractedBits = '';
    let extractedChars = '';

    // Read the bits from the LSB of each color channel
    for (let i = 0; i < imageData.data.length; i++) {
      if (i % 4 === 3) continue; // Skip alpha channel

      // Get LSB
      extractedBits += (imageData.data[i] & 1).toString();

      // When we have 8 bits, convert to character
      if (extractedBits.length === BITS_PER_CHAR) {
        extractedChars += String.fromCharCode(parseInt(extractedBits, 2));
        extractedBits = '';

        // Check for header first
        if (
          extractedChars.length === MESSAGE_HEADER.length &&
          extractedChars !== MESSAGE_HEADER
        ) {
          throw new Error('Message not found in the image');
        }

        // Once we have the complete message, stop
        if (extractedChars.includes(MESSAGE_BORDER + MESSAGE_BORDER)) {
          break;
        }
      }
    }

    // Parse the extracted string to get the ciphertext
    if (!extractedChars.startsWith(MESSAGE_HEADER)) {
      throw new Error('Message not found in the image');
    }

    // Extract length and message
    const lengthStartIndex = MESSAGE_HEADER.length;
    const lengthEndIndex = extractedChars.indexOf(
      MESSAGE_BORDER,
      lengthStartIndex
    );

    if (lengthEndIndex === -1) {
      throw new Error('Invalid message format');
    }

    const lengthStr = extractedChars.substring(
      lengthStartIndex,
      lengthEndIndex
    );
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length <= 0) {
      throw new Error('Invalid message length');
    }

    const messageStartIndex = lengthEndIndex + 1;
    const messageEndIndex = messageStartIndex + length;

    if (messageEndIndex > extractedChars.length) {
      throw new Error('Message incomplete');
    }

    const ciphertext = extractedChars.substring(
      messageStartIndex,
      messageEndIndex
    );

    // Decrypt the message
    const bytes = AES.decrypt(ciphertext, password);
    const decryptedMessage = bytes.toString(enc.Utf8);

    if (!decryptedMessage) {
      throw new Error('Password is incorrect');
    }

    return decryptedMessage;
  } catch (error) {
    console.error('Decoding error:', error);
    throw error;
  }
};

// Helper function to handle file upload and convert to base64
export const getBase64FromFile = (file) => {
  if (!(file instanceof Blob)) {
    return Promise.reject(new Error('Invalid file: not a Blob or File object'));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// If outputImage is already a base64 string, you can use it directly
export const handleSaveImage = (outputImage) => {
  if (outputImage) {
    const link = document.createElement('a');
    link.download = 'stego-image.png';
    link.href = outputImage;
    link.click();
  }
};
export { getImageDataFromBase64Image };
