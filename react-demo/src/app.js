import React from 'react';
import {render} from 'react-dom';
import './statics/index.scss';
import FiledBox from './component/filedBox';
import store from './store'
import {Provider} from 'react-redux'

render(
    <Provider store={store}>
        <FiledBox/>
    </Provider>,
    document.getElementById('app')
);