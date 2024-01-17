import Logo from "../assets/logo.png"

// v0 by Vercel.
// https://v0.dev/t/GkNjwEC

type Props = {
  description: string
  expense: string
  amount: Number
  timestamp: string
}


const Expense = (props: Props) => {
  return (
            <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{props.timestamp.slice(0, 10)}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{props.description}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 inline-block mr-1"
                    >
                      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                      <path d="M7 7h.01"></path>
                    </svg>
                    Office
                  </span>
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">${props.amount.toFixed(2)}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button
                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-2 py-1 bg-transparent text-black hover:bg-gray-200 active:bg-gray-300 rounded"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
  )
}

export default Expense

