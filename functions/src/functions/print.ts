import { logger } from "firebase-functions/v2";

export default function print(text: any, isError = false) {
  if (isError) {
    logger.error(text, {
      structuredData: true,
    });
    return;
  }

  logger.info(text, {
    structuredData: true,
  });
}
