import { Canvas, Gauge } from '../../../src';
import { createContext, delay } from '../../util';
const context = createContext();

describe('Gauge', () => {
  it('render', async () => {
    const App = (
      <Canvas pixelRatio={1}>
        <Gauge
          center={{ x: 150, y: 150 }}
          startAngle={Math.PI}
          endAngle={Math.PI * 2}
          percent={0.5}
          r="200px"
          tickCount={6}
          tickOffset="-40px"
          tickLength="20px"
        />
      </Canvas>
    );

    const context = createContext(App)
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
