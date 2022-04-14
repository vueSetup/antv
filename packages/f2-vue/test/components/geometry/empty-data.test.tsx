import Geometry from '../../../src/components/geometry';
import { createContext, delay } from '../../util';
import { Canvas, Chart, Axis } from '../../../src';

class Custom extends Geometry {
  render() {
    const records = this.mapping();
    return (
      <group>
        {records.map((record) => {
          const { children } = record;
          return children.map((item) => {
            const { x, y } = item;
            return (
              <circle
                attrs={{
                  x,
                  y,
                  r: '20px',
                  fill: '#000',
                }}
              />
            );
          });
        })}
      </group>
    );
  }
}

describe('empty data', () => {
  it('data is null', async () => {
    const App = (
      <Canvas pixelRatio={1}>
        <Chart data={null}>
          <Axis field="x" />
          <Custom x="x" y="y" />
        </Chart>
      </Canvas>
    );
    const context = createContext(App)

    await delay(100);

    expect(canvas.container.get('children').length).toBe(1);
    expect(canvas.container.get('children')[0].get('children').length).toBe(0);

    canvas.destroy();
  });

  it('data array is empty', async () => {
    const App = (
      <Canvas pixelRatio={1} animate={false}>
        <Chart data={[]}>
          <Axis field="x" />
          <Axis field="y" />
          <Custom x="x" y="y" />
        </Chart>
      </Canvas>
    );
    const context = createContext(App)

    await delay(100);
    expect(context).toMatchImageSnapshot();
    // expect(ref.current.records.length).toBe(1);
    // expect(ref.current.records[0].children).toEqual([]);
  });
});
