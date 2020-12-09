import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map( partsInfo => <Part key={partsInfo.id} part={partsInfo} />) }
      </div>
    )
};

export default Content;