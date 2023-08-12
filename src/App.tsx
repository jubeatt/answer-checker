import { Button, Col, ConfigProvider, Row, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AnswerType, AnswerData } from './types'
import { cloneDeep } from 'lodash'
import AnswerBox from './components/AnswerBox'
import { ResultList } from './components/ResultList'

function App() {
  //// states
  const [userAnswer, setUserAnswer] = useState<AnswerData[]>([])
  const [theAnswer, setTheAnswer] = useState<AnswerData[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isEdit, setIsEdit] = useState({
    userAnswer: false,
    theAnswer: false
  })

  //// effects
  useEffect(() => {
    if (showResult) {
      scrollToBottom()
    }
  }, [showResult])

  //// handlers
  function handleAddAnswer(type: AnswerType, value: string) {
    if (type === AnswerType.userAnswer) {
      const newAnswer = cloneDeep(userAnswer)
      newAnswer.push({
        id: uuidv4(),
        value
      })
      setUserAnswer(newAnswer)
    } else {
      const newAnswer = cloneDeep(theAnswer)
      newAnswer.push({
        id: uuidv4(),
        value
      })
      setTheAnswer(newAnswer)
    }
    setShowResult(false)
  }

  function handleDelete(type: AnswerType, id: string) {
    if (type === AnswerType.userAnswer) {
      const newANswer = userAnswer.filter((item) => item.id !== id)
      setUserAnswer(newANswer)
    } else {
      const newANswer = theAnswer.filter((item) => item.id !== id)
      setTheAnswer(newANswer)
    }
    setShowResult(false)
  }

  function handleEditButton(type: AnswerType) {
    if (type === AnswerType.userAnswer) {
      const newState = { ...isEdit }
      newState.userAnswer = !newState.userAnswer
      setIsEdit(newState)
    } else {
      const newState = { ...isEdit }
      newState.theAnswer = !newState.theAnswer
      setIsEdit(newState)
    }
    setShowResult(false)
  }

  function handleCheckBtn() {
    if (theAnswer.length === userAnswer.length) {
      setShowResult(true)
      if (showResult) {
        scrollToBottom()
      }
    }
  }

  function handleReset() {
    setShowResult(false)
    setTheAnswer([])
    setUserAnswer([])
  }

  function scrollToBottom() {
    const rootElement = document.getElementById('root') as HTMLDivElement
    const height = rootElement.offsetHeight
    window.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  }

  //// computed
  const invalidAmount = userAnswer.length !== theAnswer.length

  return (
    <div className='wrapper'>
      <h1>
        <span className='logo'>A</span>nswer Checker
      </h1>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00a9ce'
          }
        }}
      >
        <div className='mt-30 mb-20'>
          {invalidAmount ? (
            <Tooltip
              arrow={false}
              title='Invalid Input. Please ensure that the quantity of both answers is the same.'
            >
              <Button
                className='check-btn'
                type='primary'
                disabled
              >
                Check
              </Button>
            </Tooltip>
          ) : (
            <Button
              className='check-btn'
              type='primary'
              onClick={handleCheckBtn}
            >
              Check
            </Button>
          )}
          <Button
            className='check-btn ml-10'
            type='primary'
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </ConfigProvider>
      <Row gutter={[40, 40]}>
        {/* User Answer */}
        <Col
          span={24}
          md={12}
        >
          {
            <AnswerBox
              title='Your Answer'
              type={AnswerType.userAnswer}
              data={userAnswer}
              canDrag={isEdit.userAnswer}
              onAddAnswer={handleAddAnswer}
              onEditAnswer={handleEditButton}
              onDataDelete={handleDelete}
              onDataChange={setUserAnswer}
            />
          }
        </Col>
        {/* The Answer */}
        <Col
          span={24}
          md={12}
        >
          <AnswerBox
            title='The Answer'
            type={AnswerType.theAnswer}
            data={theAnswer}
            canDrag={isEdit.theAnswer}
            onAddAnswer={handleAddAnswer}
            onEditAnswer={handleEditButton}
            onDataDelete={handleDelete}
            onDataChange={setTheAnswer}
          />
        </Col>
      </Row>
      {/* Result */}
      {showResult && (
        <ResultList
          userAnswer={userAnswer}
          theAnswer={theAnswer}
          onTryAgain={handleReset}
        />
      )}
    </div>
  )
}

export default App
