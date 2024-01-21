import './Letters.css';
import Loop from "../Loop/Loop"
function Letters() {
  const elements = [];
  for (let i = 0; i < 16; i++) {
    elements.push(
      {
        content: i+1,
        id: i,
      }
    );
  }
  return (
    <Loop elements={elements} position={0}/>
  );
}

export default Letters;
