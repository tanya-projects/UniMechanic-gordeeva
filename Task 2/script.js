const urlData = 'https://jsonplaceholder.typicode.com/posts';

async function getData(url) {
  const response = await fetch(url);

  var data = await response.json();
  console.log(data);

  show(data);
}

getData(urlData);

function show(data) {
  let tab = `<thead>
  <tr>
      <th scope='col' id='userId'>User Id</th>
      <th id='id'>Id</th>
      <th id='title'>Title</th>
      <th id='body'>Body</th>
      </tr>
      </thead>`;

  for (let row of data) {
    tab += `<tr>
          <td>${row.userId}</td>
          <td>${row.id}</td>
          <td>${row.title}</td>
          <td>${row.body}</td>
          </tr>`;
  }

  document.getElementById('table').innerHTML = tab;
}
