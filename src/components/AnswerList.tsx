import { Store } from 'antd/es/form/interface'
import { ReactSortable, Sortable } from 'react-sortablejs'
import { AnswerType, ListData } from '../types'
import { Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

export interface AnswerListProps<T extends ListData[]> {
  data: T
  type: AnswerType
  canDrag: boolean
  onDataChange: (newState: ListData[], sortable: Sortable | null, store: Store) => void
  onDataDelete: (type: AnswerType, id: string) => void
}

const AnswerList = <T extends ListData[]>(props: AnswerListProps<T>) => {
  const { data, canDrag, type, onDataChange, onDataDelete } = props
  return (
    <div className='list'>
      <ReactSortable
        list={data}
        setList={onDataChange}
        animation={200}
        dragClass='dragging'
        ghostClass='dragging'
        disabled={!canDrag}
      >
        {data.map((item, index) => (
          <div
            className='list-item'
            key={item.id}
          >
            <div className='list-item-left'>
              {canDrag && <span className='dragger'></span>}
              <span>
                {index + 1}. {item.value}
              </span>
            </div>
            {!canDrag && (
              <Button
                type='text'
                onClick={() => onDataDelete(type, item.id)}
              >
                <DeleteFilled style={{ fontSize: 24 }} />
              </Button>
            )}
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default AnswerList
