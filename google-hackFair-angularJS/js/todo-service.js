/**
 * todo-service Module
 *
 * Description
 */
angular.module('log-service', []).
	value('apiKey','50728d46e4b088be4c29ea02').
	factory('logger',function($http,apiKey) {
		function Logger () {

		}

		Logger.prototype.log = function(userName,text) {
			var currentDate = new Date();
			$http.post('https://api.mongolab.com/api/1/databases/angular-todo/collections/logs',{
				userName : userName,
				text : text,
				time : currentDate.getHours()
			},{
				params: {
					apiKey : apiKey
				}
			})
			.success(function(data) {
				console.log(userName+"`s "+text+" is done");
			})
			.error(function(data, status) {
				throw Error(status);
			});
		};

		return new Logger();
	}).
	controller('todoCtrl',function($scope, logger) {
		var userName = "jeado";
    var todos = [
        { text: 'task 1', done : false},
        { text: 'task 2', done : true},
        { text: 'task 3', done : false},
        { text: 'task 4', done : false}
    ];

    $scope.name = userName;
    $scope.todos = todos;

    $scope.remain = function() {
        return _.reduce($scope.todos,function(p,n) {
            return (n.done === false) ? p+1 : p;
        },0);
    };

    $scope.add = function(text) {
        var newTask = {
            text: text,
            done: false
        };
        
        $scope.todos.push(newTask);
        $scope.newTaskText = '';
    };

    $scope.archive = function() {
        $scope.todos = _.filter($scope.todos,function(item) {
            return (item.done === false) ? true : false;
        });
    };

		$scope.check = function(todo) {
			//var logger = new Logger();
			if(todo.done) logger.log(userName, todo.text);
		};
	});

angular.bootstrap($('#log-service'),['log-service']);