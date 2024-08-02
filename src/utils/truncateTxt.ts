export function truncateText2(text: any, maxLength: any) {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substring(0, maxLength) + ' ... ';
      return truncatedText;
    }
  }

  export function truncateText(text: any, maxLength: any) {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substring(0, 7) + ' ... ' + text.substring(text.length - 7);
      return truncatedText;
    }
  }