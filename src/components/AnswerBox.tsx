import AnswerList, { AnswerListProps } from './AnswerList'
import { ListData, AnswerType } from '../types'
import { Button } from 'antd'
import { OPTIONS } from '../utils/contants'
import { InfoCircleFilled } from '@ant-design/icons'

interface Props<T extends ListData[]> extends AnswerListProps<T> {
  title: string
  onAddAnswer: (type: AnswerType, value: string) => void
  onEditAnswer: (type: AnswerType) => void
}

const AnswerBox = <T extends ListData[]>(props: Props<T>) => {
  const { title, type, data, canDrag, onAddAnswer, onEditAnswer, onDataChange, onDataDelete } = props

  return (
    <>
      <h2>
        <span className='underline'>{title}</span>
      </h2>
      <div className='options'>
        <div className='options-left'>
          {OPTIONS.map((value) => (
            <Button
              type='primary'
              key={value}
              onClick={() => onAddAnswer(type, value)}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className='options-right'>
          <Button
            type='primary'
            disabled={data.length < 1}
            onClick={() => onEditAnswer(type)}
            danger={canDrag}
          >
            {canDrag ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>
      {data.length > 0 ? (
        <AnswerList
          data={data}
          type={type}
          canDrag={canDrag}
          onDataChange={onDataChange}
          onDataDelete={(type, id) => onDataDelete(type, id)}
        />
      ) : (
        <p className='color-light-gray'>
          <span className='mr-10'>
            <InfoCircleFilled />
          </span>
          Add some option here.
        </p>
      )}
    </>
  )
}

export default AnswerBox
