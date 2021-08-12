import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectTodo,
  addTodo,
  toggleTodo,
  removeTodo,
} from './todoSlice';

interface IItem {
  complete: boolean;
}

const Container = styled.div`
  display: flex;
`;

const Item = styled.div<IItem>`
  cursor: pointer;
  ${(props) => props.complete && css`
    text-decoration: line-through
    `
}
`;
export default function Todo() {
  const todo = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = useState('');
  return (
    <div>
      {todo.map((item) => (
        <Container key={item.id}>
          <Item
            onClick={() => dispatch(toggleTodo(item.id))}
            complete={item.complete}
          >
            {item.text}
          </Item>
          <button
            type="button"
            onClick={() => dispatch(removeTodo(item.id))}
          >
            Remove Todo
          </button>
        </Container>
      ))}
      <Container>
        <button
          type="button"
          onClick={() => {
            dispatch(addTodo(newTodo));
            setNewTodo('');
          }}
        >
          Add Todo
        </button>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </Container>
    </div>
  );
}
