import { Button, ConfigProvider } from 'antd'
import { AnswerData } from '../types'

type Props = {
  userAnswer: AnswerData[]
  theAnswer: AnswerData[]
  onTryAgain: () => void
}

export const ResultList = (props: Props) => {
  const { userAnswer, theAnswer, onTryAgain } = props
  const [correctCount, wrongCount] = getResultCount(theAnswer)

  function getResultCount(list: AnswerData[]) {
    const correctCount = list.reduce((total, data, index) => {
      const comparedList = userAnswer[index]
      if (data.value === comparedList.value) {
        return total + 1
      }
      return total
    }, 0)

    const wrongCount = list.length - correctCount

    return [correctCount, wrongCount]
  }

  return (
    <div className='result'>
      <h2>
        <span className='underline'>Result</span>
      </h2>
      <div className='result-try-another'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00a9ce'
            }
          }}
        >
          <div>
            <Button
              className='check-btn'
              type='primary'
              onClick={onTryAgain}
            >
              Try Another
            </Button>
          </div>
        </ConfigProvider>
      </div>
      <p>
        You have <span className='result-correct-count'>{correctCount}</span> correct answers and{' '}
        <span className='result-wrong-count'>{wrongCount}</span> wrong answers.
      </p>
      <ul className='result-list'>
        {theAnswer.map((data, index) => {
          const order = index + 1
          const comparedList = userAnswer[index]

          const answer = comparedList.value
          const rightAnswer = data.value

          const isCorrect = answer === rightAnswer

          return !isCorrect ? (
            <li
              key={data.id}
              className='result-list-item wrong'
            >
              <span>{order}. </span>
              <span className='line-through mr-10'>{answer}</span>
              <span className=''>{rightAnswer}</span>
            </li>
          ) : (
            <li
              key={data.id}
              className='result-list-item correct'
            >
              <span>
                {order}. {rightAnswer}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
