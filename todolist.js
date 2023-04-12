var renderTodolist = function () {
    var getTodolist = fetch("http://localhost:3000/todos?");
    getTodolist
        .then(function (response) {
            return response.json();
        })
        .then(function (todos) {
            var tbody = document.querySelector("tbody");
            var html = "";
            todos.forEach(function (todo) {
                html += `<tr>
              <td>${todo.title}</td>
              <td><button class="delete" onclick="deleteTodo(${todo.id})"><i class="fas fa-trash-alt"></i></button></td>
          </tr>`;
            });
            tbody.innerHTML = html;
        });
};
renderTodolist();

var formAdd = document.querySelector(".form-add");
formAdd.addEventListener("submit", function (e) {
    e.preventDefault();
    var titleObj = this.querySelector('[name="title"]');
    var title = titleObj.value;

    var body = {
        title: title,

    };

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(function (response) {
        if (response.ok) {
            alert("Đã thêm vào danh sách");
            titleObj.value = "";

            renderTodolist();
        }
    });
});
function deleteTodo(id) {
    if (window.confirm('Bạn có chắn chắn muốn xóa')) {
        fetch('http://localhost:3000/todos/' + id, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    renderTodolist();
                }
            });
    }
}




