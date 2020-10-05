$(document).ready(function () {

	var firebaseConfig = {
		apiKey: "AIzaSyAN5UlAh_KhXFIooiJgKYjWQqotNaOStpE",
		authDomain: "my-todo-app-b0354.firebaseapp.com",
		databaseURL: "https://my-todo-app-b0354.firebaseio.com",
		projectId: "my-todo-app-b0354",
		storageBucket: "my-todo-app-b0354.appspot.com",
		messagingSenderId: "991168966077",
		appId: "1:991168966077:web:f747f6745acfb08fcc76d4"
	  };
	  
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	let todo = firebase.database().ref('todo');

	todo.on('value', function (snapshot) {
		// console.log(snapshot.val());

		let data = snapshot.val()

		$('#pending').html('');
		$('#completed').html('');

		for (let key in data) {

			if (data[key].Status === "Pending") {
				$('#pending').append(`
					<div class="card">
						<div class="card-body">
							<h6>${data[key].Task}</h6>
							<div class="row mb-2 w-75 input-to-edit" style="margin-left:1px">
								<input class="col-md-9" type="text" name="" class="form-control" id="task-edit">
								<button class="btn btn-primary btn-sm col-md-3 save" id="add-task">Save</button>
							</div>
							
							<button data-id="${key}" class="btn btn-secondary btn-sm edit">Edit</button>
							<button data-id="${key}" class="btn btn-danger btn-sm delete">Delete</button>
							<button data-id="${key}" class="btn btn-success btn-sm complete">Completed</button>
						</div>
					</div>
					`);

				$('.input-to-edit').hide();

			} else {
				$('#completed').append(`
  				<div class="card">
					<div class="card-body">
						<h6>${data[key].Task}</h6>
						
					</div>
				</div>
  				`);
			}


		};
	})

	// $('.input-to-edit').hide();




	$('#add-task').click(function () {

		let task = $('#task-input').val();

		let todoRef = todo.push({
			Task: task,
			Status: 'Pending'
		});

		$('#task-input').val('');
		alert("Task added");

	});


	// Event Delegation 

	// For deletion

	$('#pending').on('click', '.delete', function () {

		let taskId = $(this).data("id");

		// Delete that particular task

		firebase.database().ref('todo/' + taskId).remove();

	});


	// For complete

	$('#pending').on('click', '.complete', function () {

		let taskId = $(this).data("id");
		// console.log(taskId);

		// Update that particular task

		firebase.database().ref('todo/' + taskId).update({
			Status: 'Completed'
		});

	}); 

	
	// For edit


	$(document).on('click', '.edit', function () {

		$('.input-to-edit').show();
		window.taskId = $(this).data("id");
		console.log(taskId);

		
	})

	$(document).on('click', '.save', function () {

		firebase.database().ref('todo/' + taskId).update({

			Task: $('#task-edit').val()
			
		})

	})





})


