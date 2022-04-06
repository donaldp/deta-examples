import { Command } from '@formidablejs/console'
import { Application } from '@formidablejs/console'
import { Seeder } from './src/Seeders/DetaBaseSeeder'

class DBSeed < Command

	get signature
		'db:seed'
	
	def handle
		await Seeder.run!

		self.info "Successfully ran seeder"

		process.exit!

const app = new Application('Deta Examples', '1.0')

app.register(DBSeed)

app.run!
