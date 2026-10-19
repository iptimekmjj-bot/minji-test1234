const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3376;

app.use(express.urlencoded({ extended: true }));
// POST /todo/1?_method=PUT → PUT /todo/1 로 처리
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장 (서버 재시작 시 초기화)
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

app.get('/todo', (req, res) => {
  res.json(todos);
});
// 7. PUT 라우트 (할 일 수정)
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    if (text !== undefined) todo.text = text;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo를 찾을 수 없습니다.' });
  }
});

// 8. DELETE 라우트 (할 일 삭제)
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ message: '삭제되었습니다.' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
