import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllCategories } from './allCategories.page';

describe('HomePage', () => {
  let component: AllCategories;
  let fixture: ComponentFixture<AllCategories>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCategories ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
