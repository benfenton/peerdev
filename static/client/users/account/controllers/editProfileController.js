app.controller('editProfileController', function ($scope, $rootScope, GeneralCategories, StatusService, RVValidate, UniversalAlertService, Initialize, $q, $state) {
    $scope.profile = angular.copy($rootScope.current_user);
    $scope.states = GeneralCategories.states;
    $scope.save_status = StatusService.createSaveStatus();

    $scope.save = function () {
        var saveProfile = function (setLocation) {
            RVValidate.validate($scope, 'edit_profile', {
                status: 'save_status',
                valid: function () {
                    $scope.profile.save(undefined, setLocation)
                        .then(function () {
                            return Initialize.getCurrentUser();
                        }, function (err) {
                            $scope.save_status.reset();
                            if (err.pd1000 || err.pd1100) {
                                $scope.usernameError = err.pd1000;
                                $scope.emailError = err.pd1100;
                            } else {
                                UniversalAlertService.createTryAgainErrorAlert();
                            }
                            return $q.reject()
                        })
                        .then(function () {
                            $scope.save_status.reset();
                            $state.go('my_projects')
                            UniversalAlertService.createTransientSuccessAlert("Profile saved successfully!", true);
                        });
                }
            })
        };

        var hasChanged = function (dataName) {
            return $scope.profile.data[dataName] !== $rootScope.current_user.data[dataName];
        };

        saveProfile(hasChanged('city') && hasChanged('state'));
    }
});