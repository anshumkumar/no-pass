import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This is a mock data array. In a real application, you would fetch this data from your backend.
const cards = [
  { id: 1, name: "John Doe", number: "**** **** **** 1234", expiry: "12/24" },
  { id: 2, name: "Jane Smith", number: "**** **** **** 5678", expiry: "06/25" },
]

export function YourCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Credit Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Card Number</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.name}</TableCell>
                <TableCell>{card.number}</TableCell>
                <TableCell>{card.expiry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

