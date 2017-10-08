(function () {
    var mainController = function ($scope, $http, $location, Twilio, ngNotify) {
        var SID = "ACfcc6c7984be14c54414ae757245fe958";
        var Key = "52652fda5d5b996ccbed5f4e2534d588";

        var vm = this;

        vm.sendVerificationMessage = function () {
            var url = 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json';
            var data = {
                "From": "+441877221043",
                "To": vm.toNumber,
                "Body": "You have just logged on through our GrassRoots platform.\nPlease enter the following number to verify your account: " + verificationNumber
            }

            var config = {
                headers: {
                    'Authorization': 'Basic ' + btoa(SID + ':' + Key)
                }
            }

            $http.post(url, data, config)
                .then(
                function (response) {
                    $location.path('/verification');
                },
                function (response) {
                    console.log(JSON.stringify(response));
                }
                );
        }

        vm.submit = function () {
            Twilio.create('Messages', {
                From: '+441877221043',
                To: vm.toNumber,
                Body: 'You have just logged on through our GrassRoots platform.\nPlease enter the following number to verify your account: ' + verificationNumber
            }).then(function (data, status, headers, config) {
                $location.path('/verification');
                ngNotify.set('Please enter the verification number received in text!', 'success');
            }, function (data, status, headers, config) {
                ngNotify.set('Sorry we cannot send a text to this number at this time!', 'error');
            });
        };

        vm.validate = function () {
            if (verificationNumber == vm.verNumber) {
                $location.path('/myvotes');
                ngNotify.set('Phone number successfully verified!', 'success');
            } else {
                ngNotify.set('Incorrect verification number!', 'error');
            }
        }

        vm.votes = [
            {
                'name': 'Tesco',
                'voteBalance': 7,
                'charities': [
                    {
                        'name': 'Alzheimer Scotland',
                        'url': 'img/alzheimer.jpg',
                        'votes': 37829
                    },
                    {
                        'name': 'Terrence Higgins Trust Scotland',
                        'url': 'img/terrence.jpg',
                        'votes': 1243
                    },
                    {
                        'name': 'Glasgow Children\'s Hospital',
                        'url': 'img/glasgowchildren.jpg',
                        'votes': 8916
                    }]
            },
            {
                'name': 'ASDA',
                'voteBalance': 2,
                'charities': [
                    {
                        'name': 'Aberlour Child Care Trust',
                        'url': 'img/aberlour.jpg',
                        'votes': 1827
                    },
                    {
                        'name': 'Scottish Bible Society',
                        'url': 'img/scottishbible.jpg',
                        'votes': 781
                    },
                    {
                        'name': 'ENABLE Scotland',
                        'url': 'img/enable.jpeg',
                        'votes': 182
                    }]
            }
        ];

        vm.incrementVote = function (company, index) {
            if (company.voteBalance > 0) {
                company.charities[index].votes++;
                company.voteBalance--;
                ngNotify.set('You have successfully supported \'' + company.charities[index].name + '\' charity', 'success');
            } else {
                ngNotify.set('You don\'t have enough tokens left.', 'warn');
            }

        }

        function initialiseWeb3() {
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
            } else {
                // set the provider you want from Web3.providers
                web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.43.180:8545"));
            }
        }

        function genRand() {
            return Math.floor(Math.random() * 89999 + 10000);
        }

        var verificationNumber = genRand();

        //initialiseWeb3();

        //var accounts = web3.eth.accounts;
        //console.log(JSON.stringify(accounts)); 
    }

    var app = angular.module('customerPortal');
    app.controller('mainController', mainController);
})();
