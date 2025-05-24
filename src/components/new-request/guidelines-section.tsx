// "use client"

// import { useState } from "react"
// import { ChevronUp, ChevronDown } from "lucide-react"

// export default function GuidelinesSection() {
//     const [isOpen, setIsOpen] = useState(false)

//     return (
//         <div className="bg-gray-200 rounded-2xl mb-8">
//             <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="bg-[#929292] py-4 px-3 rounded-t-2xl w-full h-full cursor-pointer flex items-center justify-between"
//             >
//                 <h3 className="font-semibold flex items-center text-white">
//                     {isOpen ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
//                     Communication Guidelines
//                 </h3>
//             </div>

//             {isOpen && (
//                 <div>
//                     <ul className="ml-6 pb-1 mt-2 text-sm list-disc">
//                         <li className="mb-3 ml-4 mt-2">
//                             Please note that for any event, only 2 Friday announcement submissions are allowed.
//                         </li>
//                         <li className="mb-3 ml-4 mt-2">All communications must be channeled through the Southwest Portal.</li>
//                         <li className="mb-3 ml-4 mt-2">
//                             The Council Secretariat & Institutional Communications Team reserves the right to modify or make any
//                             grammatical changes to the communication request, as necessary.
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     )
// }


"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function GuidelinesSection({ title = "Communication Guidelines", guidelines = [] }: { title?: string; guidelines?: string[] }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-gray-200 rounded-2xl mb-8">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#929292] py-4 px-3 rounded-t-2xl w-full h-full cursor-pointer flex items-center justify-between"
            >
                <h3 className="font-semibold flex items-center text-white">
                    {isOpen ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                    {title}
                </h3>
            </div>

            {isOpen && (
                <div>
                    <ul className="ml-6 pb-1 mt-2 text-sm list-disc">
                        {guidelines.map((item, index) => (
                            <li key={index} className="mb-3 ml-4 mt-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
