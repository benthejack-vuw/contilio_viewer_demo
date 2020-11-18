import './item-list-item.css';
import React from 'react';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { highlight } from '../store/viewer/actions';
import StatusIndicator from './StatusIndicator';

const classes = {
	base: 'item-list-item',
	name: 'item-list-item__name',
};

const ItemListItem = ({ data, toggleVisibility, highlight, unhighlight }) => {
	const dim = useSelector(({viewer}) => !!viewer.highlighted && viewer.highlighted !== data.Guid)
	const dispatch = useDispatch();

  return (
    <div className={classes.base}>
			<ToggleButton
				status={data.visible}
				callback={() => toggleVisibility(data.Guid)}
			/>
			<div
				className={classes.name}
				onMouseOver={() => highlight(data.Guid)}
				onMouseOut={() => unhighlight()}
				style={{opacity: dim ? 0.5 : 1 }}
			>
				{ data.Name }
			</div>
			<StatusIndicator status={data.State} />
    </div>
  );
};

export default ItemListItem;
