export default function decodeHtmlEntity(encodedStr: string): string {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedStr;
  return textArea.value;
}
