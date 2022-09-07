/** @jsxImportSource @antv/f2 */
import { withLegend } from '@antv/f2-vue';
import { isFunction } from 'lodash-es';

const Marker = ({ type, color }) => {
  if (type === 'square') {
    return (
      <rect
        style={{
          width: '12px',
          height: '12px',
          marginRight: '10px',
        }}
        attrs={{
          fill: color,
        }}
      />
    );
  }
  if (type === 'line-circle') {
    return (
      <group>
        <circle
          style={{
            width: '12px',
            height: '12px',
            marginRight: '10px',
          }}
          attrs={{
            fill: color,
          }}
        />
        <line
          style={{
            width: '18px',
            height: 0,
          }}
          attrs={{
            lineWidth: 1,
            stroke: color,
            fill: color,
          }}
        />
      </group>
      // <line
      //   style={{
      //     width: '18px',
      //     height: 0,
      //   }}
      //   attrs={{
      //     lineWidth: 3,
      //     stroke: '2px',
      //     fill: color,
      //   }}
      // />
    );
  }
  return (
    <circle
      style={{
        width: '12px',
        height: '12px',
        marginRight: '10px',
      }}
      attrs={{
        fill: color,
      }}
    />
  );
};

const LegendView = (props) => {
  console.log('props', props);
  const {
    items,
    itemWidth,
    itemFormatter,
    style,
    marker = 'square', // 图例标记默认为 circle
    nameStyle,
    valueStyle,
    valuePrefix,
  } = props;

  const formatValue = (value, valuePrefix = ': ') => {
    return `${valuePrefix}${value}`;
  };

  return (
    <group style={style}>
      {items.map((item) => {
        const { color, name, value, filtered, tickValue } = item;
        console.log('item', item);
        const valueText = isFunction(itemFormatter)
          ? itemFormatter(value, tickValue)
          : value;
        return (
          <group
            className="legend-item"
            style={{
              width: itemWidth,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: ['6px', '6px', '6px', 0],
            }}
            data-item={item}
          >
            <Marker color={filtered ? '#bfbfbf' : color} type={marker} />
            <text
              attrs={{
                fill: filtered ? '#bfbfbf' : '#808080',
                text: name,
                ...nameStyle,
              }}
            />
            {valueText ? (
              <text
                attrs={{
                  fill: '#808080',
                  text: formatValue(valueText, valuePrefix),
                  ...valueStyle,
                }}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};

export default withLegend(LegendView);
