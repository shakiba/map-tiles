export default function stopEvent(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};