import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '@api'

const countQueryKey = ['count']

export function Count() {
    const queryClient = useQueryClient()

    const { data: count, isLoading } = useQuery({
        queryKey: countQueryKey,
        queryFn: api.getCurrentCount,
    })

    const incrementMutation = useMutation({
        mutationFn: api.incrementCount,
        onSuccess: (updated) => {
            queryClient.setQueryData(countQueryKey, updated)
        },
    })

    if (isLoading || !count) {
        return <p>Loading...</p>
    }

    return (
        <button onClick={() => incrementMutation.mutate()} disabled={incrementMutation.isLoading}>
            {`Count: ${count.value}`}
        </button>
    )
}
