import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

const MyLoader = props => (
  <ContentLoader
    style={
      ({
        borderWidth: 2,
        borderRadius: 16,
      },
      props.index !== 2 && { marginBottom: 5 })
    }
    speed={2}
    width={390}
    height={props.height ? props.height : 31}
    viewBox={`0 0 390 ${props.height ? props.height : 31}`}
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <Rect
      x='0'
      y='0'
      rx='3'
      ry='3'
      width='390'
      height={props.height ? props.height : '31'}
    />
  </ContentLoader>
);

export default MyLoader;
