import { defineComponent } from 'vue'
import { createContext } from '../../util';
import { Canvas, Component } from '../../../src';

const Test = defineComponent({
  setup() {
    return () => (
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 10,
          height: 10,
          fill: 'red',
        }}
      />
    )
  }
})

describe('Canvas', () => {
  it('初始化', () => {
    const App = (
      <Canvas pixelRatio={1} width="300px" height="300px">
        <Test />
      </Canvas>
    );

    const context = crea

    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(300);
    expect(context.canvas.height).toBe(300);

    expect(testComponent).toBe(Test);

    canvas.render();

    const rect = canvas.children.component.container._attrs.children[0];
    expect(rect._attrs.type).toBe('rect');
    expect(rect._attrs.attrs.fill).toBe('red');
  });
});
