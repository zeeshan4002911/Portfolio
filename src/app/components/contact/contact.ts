import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly contact = PORTFOLIO.contact;
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  protected readonly sent = signal(false);

  submit(event: Event) {
    event.preventDefault();
    if (!this.name() || !this.email() || !this.message()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${this.name()}`);
    const body = encodeURIComponent(`${this.message()}\n\n- ${this.name()} (${this.email()})`);
    window.location.href = `mailto:${this.contact.email}?subject=${subject}&body=${body}`;
    this.sent.set(true);
  }
}
