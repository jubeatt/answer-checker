import React from 'react'
import ReactDOM from 'react-dom/'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00ce89'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')!
)
