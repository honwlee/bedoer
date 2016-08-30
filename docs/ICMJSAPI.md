### domain model object

Each IBM Case Manager model class represents a case domain model object, 
which has functions defined for domain object creation and for retrieving and upating properties.
Also, there are functions defined on each model class for referencing other IBM Case Manager model objects that are related to it.
Page widgets might need information to become workable, 
and page widgets can navigate through IBM Case Manager model objects to get context that is needed for them to render content.
For example, the Case Information page widget in the work detail page receives the work item model object from event payload,
but it needs the case model object to render content. 
Thus, to minimize the pass through of model objects from one page widget to another, 
the Case Information page widget can navigate to get the case model object from the received work item model object.

The case domain objects are mapped to server-side Content Engine and Process Engine objects. 
The IBM Content Navigator model layer APIs are already capable of searching and retrieving those server-side objects,
but they lack the semantics for the case context. 
The IBM Case Manager Client is designed to fully leverage these capabilities.

Usually, IBM Case Manager page widgets search and retrieve case domain objects by Using IBM Content Navigator model APIs,
then convert the objects to IBM Case Manager model objects by using static bridging APIs defined on IBM Case Manager model classes.
This IBM Content Navigator model to IBM Case Manager Model bridging and delegation design pattern is used in many cases when it is possible.
But, in cases where this pattern does not fit, 
IBM Case Manager model objects still need to communicatte with the IBM Case Manager plugin APIs.

In many cases, page widgets in a page or across pages are mapped to same or related case domain objects. 
When they are in same page, any intermediate changes in one page widget must be communicated to the other page widget,
which can update itself accordingly in case they share the same properties or there are constraints between their properties.
When the widgets are in different pages, 
the page widgets in one page should be notified after the page widgets in another page commits changes.
Two design patterns are used to meet the requirements.

IBM Case Manager editable model objects are of a scratch pad pattern design: 
a page widget can continually update its attributes before committing changes to server-side case domain objects.
Usually, an IBM Case Manager model object has a paired IBM Case Manager editable model object, 
which can be created by calling IBM Case Manager model object’s createEditable() function.

Page widgets in the same page share the same IBM Case Manager editable model object, 
which is carried in payload by the same event. 
The page widgets listen on the onChange() function of each attribute 
in the shared IBM Case Manager editable model object for notification when an update occurs.

Page widgets in different pages operate on different IBM Case Manager editable model objects even though they represent the same case domain object.
These editable model object are all connected to each other through the uderlying IBM Case Manager model object. 
Any changes committed on one editable model triggers the refreshment of other IBM Case Manager editable objects.
Page widgets can be notified by listening on the onRefresh() function of the IBM Case Manager editable object.

In summary, in IBM Case Manager Client, for page widgets to stay in sync with the underlying model object, 
the most convenient way is to hoot to the model object notification interface.

* Event

Page widgets communicate with other page widgets on the same page by using events.
When a user does something like clicking a button or selection something in the widget,
or when a widget receives an information update from a server, the widget can fire an event to inform other widgets on the page.
The widgets that receive the event can respond in some way.
For example, the responding widget could update the display to show information based on the information displayed by the firing widget,
communicate with a server, or fire its own event.

IBM Case Manager Client supports event broadcasting, event wiring, and publishing events across pages.
The event mechanism is build on top of dojo/topic APIs, 
with additional scope for limiting the event publish/subscribe action to inside a page rather than globally.

* Coordination

In some IBM Case Manager scenarios, it’s necessary to have several page widgets coordinate to work together to fulfill a work item.
For Example, in a work item form page, there are three page widgets - form, attachment, and work item toolbar.

If a user clicks the Save action button in the work item toolbar, several steps of coordination are needed to fulfill the save:

1. The work item toolbar asks all page widgets to commit changes. Each page widget commits its changes,
and then notifies the work item toolbar. After all page widgets complete their work, the work item toolbar moves to the data validation step.

2. The work item toolbar asks all page widgets to check if there are any validation errors. After all page widgets finish the validation, 
they notify the work item toolbar, and the toolbar moves to the before save step.

3. In the before save step, the form widget saves the form itself as an attachment of the work item. 
Then, it notifies the work item toolbar to move to the next step.

4. The next step is the save step. Here, the work item toolbar commits the changed model to the sever. 
Next, the work item toolbar starts the after save step.

5. In the after save step, the form page widget and attachment widget clear their dirty state, 
and notify the work item toolbar of their completion. 
At this point, the coordination between page widgets for the save action is complete.














