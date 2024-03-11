import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';
import "../App.css";

const SidePanel: React.FC = () => {
  const { data, error } = useSelector((state: RootState) => state.data);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  type TagsProp = {
    tags: string[];
  };

  const TagList: React.FC<TagsProp> = ({ tags }) => {
    return (
      <div className="tag-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='innerSidePanel'>
        <img src={data.image} className='productImg' />
        <div className='productDetails'>
            <p className='title'>{data.title}</p>
            <p className='subtitle'>{data.subtitle}</p>
            <TagList tags={data.tags} />
        </div>
        
    </div>
  );
};

export default SidePanel;