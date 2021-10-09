import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyVideoCardPage } from './videos-card.page';

describe('VideoCardPage', () => {
  let component: MyVideoCardPage;
  let fixture: ComponentFixture<MyVideoCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideoCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyVideoCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
