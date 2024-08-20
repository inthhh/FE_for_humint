# How to deploy this project on server

- STEP 1. build
```
    git clone http://121.252.183.23:8081/PTK-DSG-T6/humint-web-front.git
    npm install
    npm run build

    (build 폴더 생성 됐는지 확인)
```

- STEP 2. upload dist file to server(183.23) through SFTP ([SERVER PW](http://121.252.183.23:8081/PTK-DSG-T6/README/src/branch/main/ACCOUNT.md#server-%EA%B3%84%EC%A0%95-%EC%A0%95%EB%B3%B4))
```
    (build 폴더 내에 있는 모든 파일 압축 : 주의 = build 폴더를 압축 하는것이 아니고, 폴더에 들어가서 모든 파일 압축)

    sftp -P 10022 ptkconnec@121.252.183.23

    (비밀번호 입력)

    cd humint-web-frontend
    put /<your>/<path>/humint-web-front/build/build.zip

```

- STEP 3. restart httpd2 container  ([SERVER PW](http://121.252.183.23:8081/PTK-DSG-T6/README/src/branch/main/ACCOUNT.md#server-%EA%B3%84%EC%A0%95-%EC%A0%95%EB%B3%B4))
```
    ssh ptkconnec@121.252.183.23 -p 10022

    (비밀번호 입력)

    cd humint-web-frontend

    unzip build.zip

    (replace A/All)

    ------압축 해제 완료------

    sudo docker restart humint-web-front


```





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
