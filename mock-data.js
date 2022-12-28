const UserStatuses = Object.freeze({
	"registered": "REGISTERED",
	"active": "ACTIVE",
	"inactive": "INACTIVE"
});
const TaskStatuses = Object.freeze({
	"open": "OPEN",
	"inprogress": "INPROGRESS",
	"completed": "COMPLETED"
});

const users = [
	{
		"id": 120,
		"first_name": "Admin",
		"last_name": "Kumar",
		"email": "admin@yopmail.com",
		"dob": "1980-01-01",
		"age": 42,
		"is_admin": true,
		"status": UserStatuses['active']
	},
	{
		"id": 121,
		"first_name": "Sachin",
		"last_name": "Kumar",
		"email": "sachin@yopmail.com",
		"dob": "1994-01-01",
		"age": 28,
		"status": UserStatuses['active'],
		"tasks": [],
		"friends": []
	},
	{
		"id": 122,
		"first_name": "Sumit",
		"last_name": "Kumar",
		"email": "sumit@yopmail.com",
		"dob": "1992-01-01",
		"age": 30,
		"status": UserStatuses['active'],
		"tasks": [],
		"friends": []
	},
	{
		"id": 123,
		"first_name": "Akash",
		"last_name": "Kumar",
		"email": "akash@yopmail.com",
		"dob": "1993-01-01",
		"age": 29,
		"status": UserStatuses['inactive'],
		"tasks": [],
		"friends": []
	},
	{
		"id": 124,
		"first_name": "Ravi",
		"last_name": "Kumar",
		"email": "ravi@yopmail.com",
		"dob": "1991-01-01",
		"age": 31,
		"status": UserStatuses['registered'],
		"tasks": [],
		"friends": []
	}
];
  
const posts = [
    {
      "id": 1211,
      "author": 121,
      "title": "The internet is coming",
      "content": `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    },
    {
      "id": 1222,
      "author": 122,
      "title": "Lorem Ipsum",
      "content": `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
    }
];

const createUser = (userInput) => {
	let lastUser = users[users.length - 1];
	let userPayload = {
		...userInput,
		id: lastUser ? (lastUser.id + 1) : 121,
		"status": TaskStatuses['open'],
		tasks: []
	}
	users.push(userPayload);
	return userPayload;
}

const createTask = (taskInput) => {
	let user = users.find(u => u.id == taskInput.user_id);
	if (user) {
		let userTasks = user.tasks;
		let lastTask = userTasks[userTasks.length - 1];
		let taskPayload = {
			id: lastTask ? (lastTask.id + 1) : ((user.id * 1000) + 1),
			title: taskInput.title,
			description: taskInput.description,
			"status": UserStatuses['open'],
			comments: []
		}
		userTasks.push(taskPayload);
		return taskPayload;
	}
}

const createTaskComment = (taskCommentInput) => {
	let user = users.find(u => u.tasks && u.tasks.map(i => i.id).includes(taskCommentInput.task_id));

	if (user) {
		let userTask = user.tasks.find(t => t.id == taskCommentInput.task_id);
		let author = users.find(u => u.id == taskCommentInput.author_id);
		let taskComments = userTask.comments;
		let lastTaskComment = taskComments[taskComments.length - 1];
		let taskCommentPayload = {
			id: lastTaskComment ? (lastTaskComment.id + 1) : ((user.id * 100000) + 1),
			text: taskCommentInput.text,
			author_id: taskCommentInput.author_id,
			author
		}
		taskComments.push(taskCommentPayload);
		return taskCommentPayload;
	}
}

export {
    users,
    posts,
	createUser,
	createTask,
	createTaskComment
}